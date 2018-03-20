import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class ContentAuthenticated extends React.Component {

    componentDidMount(){
        console.log("componentDidMount");
    }

    componentWillUpdate(nextProps, nextState, nextContext){
        console.log("componentWillUpdate");

    }

    componentDidUpdate(prevProps, prevState, prevContext){
        console.log("componentDidUpdate");
    }

    render() {
        return (
            <div className={"about-the-application"}>
                <Link key="home-button" className="home-button" to={"/sssss/sasaasas/55s"}>HomeHomeHomeHomeHomeHomeHomeHomeHomeHome</Link>
            </div>
        );
    }
}
ContentAuthenticated.propTypes = {
    match: PropTypes.object,
};


export default ContentAuthenticated;
export {ContentAuthenticated};