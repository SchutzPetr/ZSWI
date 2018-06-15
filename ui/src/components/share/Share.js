import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/ShareStyle";
import {Button, Card, CardContent, CardHeader} from "@material-ui/core/index";
import ShareIcon from "@material-ui/icons/Share";
import UserMultipleSelect from "../autocomplete/UserMultipleSelect";
import ProjectSelect from "../autocomplete/SingleSelect";
import User from "../../entity/User";

class Share extends React.Component {

    state = {
      selectedUsers: null,
        selectedUsers2: null
    };

    handleShare = event => {

    };

    onSelectedUserChange = value => {
        this.setState({
            selectedUsers: value,
        });
    };

    onSelectedUserChange2 = value => {
        this.setState({
            selectedUsers2: value,
        });
    };

    render() {
        return (
            <Card className={this.props.classes.root}>
                <CardHeader title="Nastavení sdílení"/>
                <CardContent className={this.props.classes.shareCardContent}>
                    <UserMultipleSelect onSelect={this.onSelectedUserChange} values={this.state.selectedUsers}/>
                    <ProjectSelect onSelect={this.onSelectedUserChange2} values={this.state.selectedUsers2}/>
                    <Button className={this.props.classes.shareButton} variant="raised" onClick={this.handleShare}>
                        <ShareIcon className={this.props.classes.shareIcon}/>
                        Sdílet
                    </Button>
                </CardContent>
            </Card>
        )
    }
}

Share.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool,
    users: PropTypes.instanceOf(User)
};

export default withStyles(Styles, {withTheme: true})(Share);