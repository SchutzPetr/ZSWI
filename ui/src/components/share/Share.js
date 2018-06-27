import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/ShareStyle";
import {Button, Card, CardContent, CardHeader} from "@material-ui/core/index";
import ShareIcon from "@material-ui/icons/Share";
import SingleSelect from "../autocomplete/SingleSelect";
import User from "../../entity/User";
import SimpleUser from "../../entity/SimpleUser";
import Suggestion from "../autocomplete/entity/Suggestion";

class Share extends React.Component {

    state = {
        selectedUser: null,
    };

    static mapSimpleUserToSuggestion(user) {
        if (!user) {
            return null;
        }
        return new Suggestion(user.id, user.displayFullName, user)
    }

    static mapSimpleUsersToSuggestion(user) {
        return user.map(value => this.mapSimpleUserToSuggestion(value));
    }

    onShareClick = event => {
        this.props.onShareClick(this.state.selectedUser);
    };

    onSelectedUserChange = value => {
        this.setState({
            selectedUser: value ? value.data : null,
        });
    };

    render() {
        return (
            <Card className={this.props.classes.root}>
                <CardHeader title="Nastavení sdílení"/>
                <CardContent className={this.props.classes.shareCardContent}>
                    <SingleSelect value={Share.mapSimpleUserToSuggestion(this.state.selectedUser)}
                                  suggestions={Share.mapSimpleUsersToSuggestion(this.props.availableUsers)}
                                  onSelect={this.onSelectedUserChange}/>
                    <Button className={this.props.classes.shareButton} variant="raised" onClick={this.onShareClick}
                            disabled={!this.state.selectedUser}>
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
    availableUsers: PropTypes.arrayOf(SimpleUser),
    authenticatedUser: PropTypes.instanceOf(User),
    onShareClick: PropTypes.func.isRequired
};

Share.defaultProps = {
    availableUsers: [],
};

export default withStyles(Styles, {withTheme: true})(Share);