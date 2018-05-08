import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Styles from "./style/ShareStyle";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "material-ui";
import AccountCircle from "material-ui-icons/es/AccountCircle";
import Forward from "material-ui-icons/es/Forward";
import ShareIcon from "material-ui-icons/es/Share";
import UserMultipleSelect from "../autocomplete/UserMultipleSelect";
import ProjectSelect from "../autocomplete/SingleSelect";

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
    paper: PropTypes.bool
};

export default withStyles(Styles, {withTheme: true})(Share);