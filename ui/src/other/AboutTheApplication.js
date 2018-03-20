import React, { Component } from 'react';
import PropTypes from "prop-types";

class AboutTheApplication extends Component {

    render() {
        return (
            <div className={"about-the-application"}>

            </div>
        );
    }
}
AboutTheApplication.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};


export default AboutTheApplication;
export {AboutTheApplication};