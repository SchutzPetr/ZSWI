import React, { Component } from 'react';
import PropTypes from "prop-types";

class SidebarAuthenticated extends Component {

    render() {
        return (
            <div className={"about-the-application"}>

            </div>
        );
    }
}
SidebarAuthenticated.propTypes = {
    match: PropTypes.object,
};


export default SidebarAuthenticated;
export {SidebarAuthenticated};