import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ROUTES from './Routes'


function Navigation() {
  return (
    <>
    <BrowserRouter>
   

    <Routes>

        <Route path={ROUTES.about.name} element={ROUTES.about.component} />
        <Route path={ROUTES.contact.name} element={ROUTES.contact.component} />
        <Route path={ROUTES.userhome.name} element={ROUTES.userhome.component} />        
        <Route path={ROUTES.productUser.name} element={ROUTES.productUser.component} />
        <Route path={ROUTES.productDetail.name} element={ROUTES.productDetail.component} />
        <Route path={ROUTES.register.name} element={ROUTES.register.component} />
        <Route path={ROUTES.login.name} element={ROUTES.login.component} />
        <Route path={ROUTES.support.name} element={ROUTES.support.component} />
        <Route path={ROUTES.universityAdmin.name} element={ROUTES.universityAdmin.component} />
        <Route path={ROUTES.departmentAdmin.name} element={ROUTES.departmentAdmin.component} />
        <Route path={ROUTES.productAdmin.name} element={ROUTES.productAdmin.component} />
        <Route path={ROUTES.userhome.name} element={ROUTES.userhome.component} />
        <Route path={ROUTES.departmentUser.name} element={ROUTES.departmentUser.component} />
        <Route path={ROUTES.userCart.name} element={ROUTES.userCart.component} />
        <Route path={ROUTES.payment.name} element={ROUTES.payment.component} />
        <Route path={ROUTES.OrderSummary.name} element={ROUTES.OrderSummary.component} />
        <Route path={ROUTES.ThankuPage.name} element={ROUTES.ThankuPage.component} />
        <Route path={ROUTES.canclePage.name} element={ROUTES.canclePage.component} />


        
        



    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Navigation