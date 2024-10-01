import React from 'react'
interface BasicLogoProps {
  classList?: string
  solid?: boolean
}

function BasicLogo({classList = '', solid = true}: BasicLogoProps) {
  if (solid) {
    return (
      <svg id="Group_23331" data-name="Group 23331" xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 32.729 37.983">
        <g id="Group_809" data-name="Group 809" transform="translate(0)">
          <path id="Path_845" data-name="Path 845" d="M200.871,234.774V242l-10.122,5.844v8.571l-6.26,6.452V244.232Z" transform="translate(-184.489 -234.737)" fill="#013eb7" />
          <path id="Path_846" data-name="Path 846" d="M208.6,334.091l-.239.155-10.792.589-10.425,4.671c1.65-.921,3.815-2.088,5.714-3.1,2.385-1.275,4.352-2.311,4.352-2.311Z" transform="translate(-186.537 -311.5)" fill="#013eb7" />
          <path id="Path_847" data-name="Path 847" d="M206.308,334.774l-1.638,1.052-3.8,2.441-3.667,2.358-1.6,1.03,5.267,8.288v.031L185.4,341.04l-.909-.524v-.143l.6-.338,10.426-4.671Z" transform="translate(-184.489 -312.028)" fill="#013eb7" />
          <path id="Path_849" data-name="Path 849" d="M251.989,275.925l-.015.022-6.064,3.943L242,282.427H229.5l.288-.177,12-.716,10.19-5.618Z" transform="translate(-219.276 -266.536)" fill="#013eb7" />
          <path id="Path_850" data-name="Path 850" d="M252.952,243.99l-10.19,5.618-12,.717,2.131-1.306,3.741-2.3,4.135-2.534,1.542-.946-5.655-8.608.043-.025,15.32,8.844Z" transform="translate(-220.258 -234.61)" fill="#013eb7" />
          <path id="Path_851" data-name="Path 851" d="M262.3,243.327l-1.542.946-4.07-2.351-.065.037v-7.228l.022-.012Z" transform="translate(-240.243 -234.694)" fill="#013eb7" />
          <path id="Path_852" data-name="Path 852" d="M190.8,333.3c-1.9,1.017-4.064,2.184-5.714,3.105l-.6.338v-.214l6.26-6.452v3.192Z" transform="translate(-184.489 -308.396)" fill="#013eb7" />
        </g>
        <path id="Path_853" data-name="Path 853" d="M273.139,276.083v18.993l-16.45,9.5-.034-.019-.031-.05v-7.2l.065.037,10.187-5.881v-7.2L272.941,276l.025-.016Z" transform="translate(-240.41 -266.588)" fill="#013eb7" />
      </svg>
    )
  } else {
    return <img className="" src="assets/img/remix_logo_light.webp" style={{height: '3rem'}} alt=""></img>
  }
}

export default BasicLogo
