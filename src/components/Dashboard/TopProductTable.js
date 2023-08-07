import React from 'react'
import { Link } from 'react-router-dom'

const TopProductTable = ({period}) => {
  return (
    <section className='top-table-wrapper'>
        <div className="list-header">
          <div className='header'>
            <p className='head-txt'>Top 5 products</p>
            <p className='period-txt'>This {period}</p>
          </div>
          <div><Link className='link-txt'>View all</Link></div>
        </div>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>product</td>
              <td>price</td>
              <td>orders</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>de</td>
              <td>ded</td>
              <td>fre</td>
              <td>frfr</td>
            </tr>
          </tbody>
        </table>
    </section>
  )
}

export default TopProductTable