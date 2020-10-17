import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import OfertarCrud from '../components/OfertarCarona/OfertarCrud'
import SolicitarCrud from '../components/SolicitarCarona/SolicitarCrud'

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/ofertar' component={OfertarCrud} />
        <Route path='/solicitar' component={SolicitarCrud} />
        <Redirect from='*' to='/' />
    </Switch>