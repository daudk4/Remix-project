import { RemixApp } from '@remix-ui/app'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import * as packageJson from '../../../../../package.json'
import { fileSystem, fileSystems } from '../files/fileSystem'
import { indexedDBFileSystem } from '../files/filesystems/indexedDB'
import { localStorageFS } from '../files/filesystems/localStorage'
import { fileSystemUtility, migrationTestData } from '../files/filesystems/fileSystemUtility'
import './styles/preload.css'
import isElectron from 'is-electron'
const _paq = (window._paq = window._paq || [])

export const Preload = (props: any) => {
  const [tip, setTip] = useState<string>('')
  const [supported, setSupported] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [showDownloader, setShowDownloader] = useState<boolean>(false)
  const remixFileSystems = useRef<fileSystems>(new fileSystems())
  const remixIndexedDB = useRef<fileSystem>(new indexedDBFileSystem())
  const localStorageFileSystem = useRef<fileSystem>(new localStorageFS())
  // url parameters to e2e test the fallbacks and error warnings
  const testmigrationFallback = useRef<boolean>(
    window.location.hash.includes('e2e_testmigration_fallback=true') && window.location.host === '127.0.0.1:8080' && window.location.protocol === 'http:'
  )
  const testmigrationResult = useRef<boolean>(
    window.location.hash.includes('e2e_testmigration=true') && window.location.host === '127.0.0.1:8080' && window.location.protocol === 'http:'
  )
  const testBlockStorage = useRef<boolean>(
    window.location.hash.includes('e2e_testblock_storage=true') && window.location.host === '127.0.0.1:8080' && window.location.protocol === 'http:'
  )

  function loadAppComponent() {
    import('../../app')
      .then((AppComponent) => {
        const appComponent = new AppComponent.default()
        appComponent.run().then(() => {
          props.root.render(<RemixApp app={appComponent} />)
        })
      })
      .catch((err) => {
        _paq.push(['trackEvent', 'Preload', 'error', err && err.message])
        console.error('Error loading Remix:', err)
        setError(true)
      })
  }

  const downloadBackup = async () => {
    setShowDownloader(false)
    const fsUtility = new fileSystemUtility()
    await fsUtility.downloadBackup(remixFileSystems.current.fileSystems['localstorage'])
    await migrateAndLoad()
  }

  const migrateAndLoad = async () => {
    setShowDownloader(false)
    const fsUtility = new fileSystemUtility()
    const migrationResult = await fsUtility.migrate(localStorageFileSystem.current, remixIndexedDB.current)
    _paq.push(['trackEvent', 'Migrate', 'result', migrationResult ? 'success' : 'fail'])
    await setFileSystems()
  }

  const setFileSystems = async () => {
    const fsLoaded = await remixFileSystems.current.setFileSystem([
      testmigrationFallback.current || testBlockStorage.current ? null : remixIndexedDB.current,
      testBlockStorage.current ? null : localStorageFileSystem.current
    ])
    if (fsLoaded) {
      console.log(fsLoaded.name + ' activated')
      _paq.push(['trackEvent', 'Storage', 'activate', fsLoaded.name])
      loadAppComponent()
    } else {
      _paq.push(['trackEvent', 'Storage', 'error', 'no supported storage'])
      setSupported(false)
    }
  }

  const testmigration = async () => {
    if (testmigrationResult.current) {
      const fsUtility = new fileSystemUtility()
      fsUtility.populateWorkspace(migrationTestData, remixFileSystems.current.fileSystems['localstorage'].fs)
    }
  }

  useEffect (() => {
    if (isElectron()){
      loadAppComponent()
      return
    }
    async function loadStorage() {
      ;(await remixFileSystems.current.addFileSystem(remixIndexedDB.current)) || _paq.push(['trackEvent', 'Storage', 'error', 'indexedDB not supported'])
      ;(await remixFileSystems.current.addFileSystem(localStorageFileSystem.current)) || _paq.push(['trackEvent', 'Storage', 'error', 'localstorage not supported'])
      await testmigration()
      remixIndexedDB.current.loaded && (await remixIndexedDB.current.checkWorkspaces())
      localStorageFileSystem.current.loaded && (await localStorageFileSystem.current.checkWorkspaces())
      remixIndexedDB.current.loaded && (remixIndexedDB.current.hasWorkSpaces || !localStorageFileSystem.current.hasWorkSpaces ? await setFileSystems() : setShowDownloader(true))
      !remixIndexedDB.current.loaded && (await setFileSystems())
    }
    loadStorage()

    const abortController = new AbortController()
    const signal = abortController.signal
    async function showRemixTips() {
      const response = await axios.get('https://raw.githubusercontent.com/remix-project-org/remix-dynamics/main/ide/tips.json', { signal })
      if (signal.aborted) return
      const tips = response.data
      const index = Math.floor(Math.random() * (tips.length - 1))
      setTip(tips[index])
    }
    try {
      showRemixTips()
    } catch (e) {
      console.log(e)
    }
    return () => {
      abortController.abort();
    };
  }, [])

  return (
    <>
      <div className="preload-container">
        <div className="preload-logo pb-4">
          {logo}
          <div className="info-secondary splash">
            REMIX IDE
            <br />
            <span className="version"> v{packageJson.version}</span>
          </div>
        </div>
        {!supported ? (
          <div className="preload-info-container alert alert-warning">
            Your browser does not support any of the filesystems required by Remix. Either change the settings in your browser or use a supported browser.
          </div>
        ) : null}
        {error ? (
          <div className="preload-info-container alert alert-danger text-left">
            An unknown error has occurred while loading the application.
            <br></br>
            Doing a hard refresh might fix this issue:<br></br>
            <div className="pt-2">
              Windows:<br></br>- Chrome: CTRL + F5 or CTRL + Reload Button
              <br></br>- Firefox: CTRL + SHIFT + R or CTRL + F5<br></br>
            </div>
            <div className="pt-2">
              MacOS:<br></br>- Chrome & FireFox: CMD + SHIFT + R or SHIFT + Reload Button<br></br>
            </div>
            <div className="pt-2">
              Linux:<br></br>- Chrome & FireFox: CTRL + SHIFT + R<br></br>
            </div>
          </div>
        ) : null}
        {showDownloader ? (
          <div className="preload-info-container alert alert-info">
            This app will be updated now. Please download a backup of your files now to make sure you don't lose your work.
            <br></br>
            You don't need to do anything else, your files will be available when the app loads.
            <div
              onClick={async () => {
                await downloadBackup()
              }}
              data-id="downloadbackup-btn"
              className="btn btn-primary mt-1"
            >
              download backup
            </div>
            <div
              onClick={async () => {
                await migrateAndLoad()
              }}
              data-id="skipbackup-btn"
              className="btn btn-primary mt-1"
            >
              skip backup
            </div>
          </div>
        ) : null}
        {supported && !error && !showDownloader ? (
          <div>
            <div className='text-center'>
              <i className="fas fa-spinner fa-spin fa-2x"></i>
            </div>
            { tip && <div className='remix_tips text-center mt-3'>
              <div><b>DID YOU KNOW</b></div>
              <span>{tip}</span>
            </div> }
          </div>
        ) : null}
      </div>
    </>
  )
}

const logo = (
  <svg id="Group_23331" data-name="Group 23331" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32.729 37.983"><g id="Group_809" data-name="Group 809" transform="translate(0)"><path id="Path_845" data-name="Path 845" d="M200.871,234.774V242l-10.122,5.844v8.571l-6.26,6.452V244.232Z" transform="translate(-184.489 -234.737)" fill="#013eb7"/><path id="Path_846" data-name="Path 846" d="M208.6,334.091l-.239.155-10.792.589-10.425,4.671c1.65-.921,3.815-2.088,5.714-3.1,2.385-1.275,4.352-2.311,4.352-2.311Z" transform="translate(-186.537 -311.5)" fill="#013eb7"/>
    <path id="Path_847" data-name="Path 847" d="M206.308,334.774l-1.638,1.052-3.8,2.441-3.667,2.358-1.6,1.03,5.267,8.288v.031L185.4,341.04l-.909-.524v-.143l.6-.338,10.426-4.671Z" transform="translate(-184.489 -312.028)" fill="#013eb7"/>
    <path id="Path_849" data-name="Path 849" d="M251.989,275.925l-.015.022-6.064,3.943L242,282.427H229.5l.288-.177,12-.716,10.19-5.618Z" transform="translate(-219.276 -266.536)" fill="#013eb7"/>
    <path id="Path_850" data-name="Path 850" d="M252.952,243.99l-10.19,5.618-12,.717,2.131-1.306,3.741-2.3,4.135-2.534,1.542-.946-5.655-8.608.043-.025,15.32,8.844Z" transform="translate(-220.258 -234.61)" fill="#013eb7"/>
    <path id="Path_851" data-name="Path 851" d="M262.3,243.327l-1.542.946-4.07-2.351-.065.037v-7.228l.022-.012Z" transform="translate(-240.243 -234.694)" fill="#013eb7"/>
    <path id="Path_852" data-name="Path 852" d="M190.8,333.3c-1.9,1.017-4.064,2.184-5.714,3.105l-.6.338v-.214l6.26-6.452v3.192Z" transform="translate(-184.489 -308.396)" fill="#013eb7"/>
  </g>
  <path id="Path_853" data-name="Path 853" d="M273.139,276.083v18.993l-16.45,9.5-.034-.019-.031-.05v-7.2l.065.037,10.187-5.881v-7.2L272.941,276l.025-.016Z" transform="translate(-240.41 -266.588)" fill="#013eb7"/></svg>
)
