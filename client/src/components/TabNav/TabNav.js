import React from 'react';
import styles from './TabNav.module.css';

class TabNav extends React.Component {
  render() {
    return (
      <div className="w-100">
        <ul className="nav nav-tabs">
          {
            this.props.tabs.map(tab => {
              const active = (tab === this.props.selected ? 'active ' : '' );
              return (
                <li className="nav-item w-25" key={ tab }>
                  <a className={"nav-link " + active + styles.tab} onClick={ () => this.props.setSelected(tab) }>
                    { tab }
                  </a>
                </li>
              );
            })
          }
        </ul>
        { this.props.children }
      </div>
    );
  }
}
export default TabNav;