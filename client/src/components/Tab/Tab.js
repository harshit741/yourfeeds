import React from 'react';
import styles from './Tab.module.css';

class Tab extends React.Component {
    render() {
        if (this.props.isSelectedTab) {
            return (
              <div>
                { this.props.children }
              </div>
            );
        }
        return null;
    }
}

export default Tab;