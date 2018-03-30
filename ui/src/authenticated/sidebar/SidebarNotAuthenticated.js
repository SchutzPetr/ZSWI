import React, { Component } from "react";
import PropTypes from "prop-types";

class SidebarNotAuthenticated extends Component {

    render() {
        return (
            <div className={"about-the-application"}>

            </div>
        );
    }
}
SidebarNotAuthenticated.propTypes = {
    match: PropTypes.object,
};


export default SidebarNotAuthenticated;
export {SidebarNotAuthenticated};