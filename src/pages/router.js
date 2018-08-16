import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Revenues from './revenues'
import RevenueEdit from './revenues-edit'

const Home = ({ match }) => (
  <div>{match.params.id}
    {console.log(match.params)}
  </div>
)

const MainRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/revenues/:id" component={RevenueEdit} />
    <Route path="/revenues" component={Revenues} />
  </Switch>
)
export default MainRouter