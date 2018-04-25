import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui/Table";
import {Button, IconButton, Menu, MenuItem, Paper} from "material-ui";
import User from "../../entity/User";
import UserCreateModal from "../user_create_modal/UserCreateModal";

const rowHeightHeader = 24;
const rowHeight = 20;

const styles = theme => ({
    root: {
        maxHeight: "calc(100vh - 115px)",
        height: "calc(100vh - 115px)",
        overflowX: "auto",
    },
    table: {
        minWidth: 700,
    },
    part: {
        borderBottom: "none",
        textAlign: "center",
        fontWeight: "bold",
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
        borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    centerHeaderText: {
        textAlign: "center",
    },
    saturday: {
        height: rowHeight,
        backgroundColor: "#dcbd31"
    },
    sunday: {
        height: rowHeight,
        backgroundColor: "#dc143c"
    },
    thuTue: {
        height: rowHeight,
        backgroundColor: "#fafafb"
    },
    defRow: {
        height: rowHeight,
    },
    headerBorder: {
        border: "1px solid rgba(224, 224, 224, 1)",
        textAlign: "center",
    },
    headerLeftRight: {
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
        borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    tableCell: {
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: "none",
    },
    partTableCell: {
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: "none",
        textAlign: "center",
    },
    moreVert: {
        height: 18,
        width: 18,
    },
    menuButton: {
        height: 20,
        width: 20,
    },
    tableCellMenu: {
        width: 32,
    },
    headerRow: {
        height: rowHeightHeader,
    }
});


class UserTable extends React.Component {

    state = {
        modalOpen: false,
        selectedData: null
    };

    handleOpenEdit = selectedData => event => {
        this.setState({
            modalOpen: true,
            selectedData: selectedData
        });
    };

    handleCloseEdit() {
        this.setState({modalOpen: false, selectedData: null});
    }

    handleOnSaveEdit = (data) =>{
        this.handleCloseEdit();
    };


    render() {
        const {classes, timeSheet} = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Jméno a příjmení</TableCell>
                            <TableCell>Pracovní umístění</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.users.map((user, index) => {
                            user = new User();
                            return <TableRow key={`${index}-${user.orion}`}>
                                <TableCell>{user.displayFullName}</TableCell>
                                <TableCell>{user.mainWorkStation}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.active}</TableCell>
                                <TableCell><Button onClick={this.handleOpenEdit(user)}>Open select dialog</Button></TableCell>
                            </TableRow>

                        })};
                    </TableBody>
                </Table>
                <UserCreateModal open={this.state.modalOpen} onSave={this.handleOnSaveEdit}
                                 onClose={this.handleCloseEdit} userToEdit={this.state.selectedData}/>
            </Paper>
        );
    }
}

UserTable.propTypes = {
    classes: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(User).isRequired,
};

export default withStyles(styles, {withTheme: true})(UserTable);