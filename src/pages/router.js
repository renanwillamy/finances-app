import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Revenues from './revenues'
import RevenueEdit from './revenues-edit'
import RevenueAdd from './revenues-add'

const Home = ({ match }) => (
  <div>{match.params.id}
  </div>
)

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/revenues/:id" component={RevenueEdit} />
    <Route exact path="/revenues-new" component={RevenueAdd} />
    <Route path="/revenues" component={Revenues} />
  </Switch>
)
export default MainRouter