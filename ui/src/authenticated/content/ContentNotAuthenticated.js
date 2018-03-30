import React from "react";
import PropTypes from "prop-types";

class ContentNotAuthenticated extends React.Component {

    render() {
        return (
            <div className={"about-the-application"}>

            </div>
        );
    }
}
ContentNotAuthenticated.propTypes = {
    match: PropTypes.object,
};


export default ContentNotAuthenticated;
export {ContentNotAuthenticated};