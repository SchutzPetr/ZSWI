import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Styles from "./style/UserMultipleSelectStyle";
import {Chip, Input, MenuItem, Typography} from "@material-ui/core/index";

const suggestions = [
    {label: 'Afghanistan'},
    {label: 'Aland Islands'},
    {label: 'Albania'},
    {label: 'Algeria'},
    {label: 'American Samoa'},
    {label: 'Andorra'},
    {label: 'Angola'},
    {label: 'Anguilla'},
    {label: 'Antarctica'},
    {label: 'Antigua and Barbuda'},
    {label: 'Argentina'},
    {label: 'Armenia'},
    {label: 'Aruba'},
    {label: 'Australia'},
    {label: 'Austria'},
    {label: 'Azerbaijan'},
    {label: 'Bahamas'},
    {label: 'Bahrain'},
    {label: 'Bangladesh'},
    {label: 'Barbados'},
    {label: 'Belarus'},
    {label: 'Belgium'},
    {label: 'Belize'},
    {label: 'Benin'},
    {label: 'Bermuda'},
    {label: 'Bhutan'},
    {label: 'Bolivia, Plurinational State of'},
    {label: 'Bonaire, Sint Eustatius and Saba'},
    {label: 'Bosnia and Herzegovina'},
    {label: 'Botswana'},
    {label: 'Bouvet Island'},
    {label: 'Brazil'},
    {label: 'British Indian Ocean Territory'},
    {label: 'Brunei Darussalam'},
].map(suggestion => ({
    value: suggestion.label,
    label: suggestion.label,
}));

class Option extends React.Component {
    handleClick = event => {
        this.props.onSelect(this.props.option, event);
    };

    render() {
        const {children, isFocused, isSelected, onFocus} = this.props;

        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {children}
            </MenuItem>
        );
    }
}

function SelectWrapped(props) {
    const {classes, ...other} = props;

    return (
        <Select
            optionComponent={Option}
            noResultsText={<Typography>{'No results found'}</Typography>}
            arrowRenderer={arrowProps => {
                return arrowProps.isOpen ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>;
            }}
            clearRenderer={() => <ClearIcon/>}
            valueComponent={valueProps => {
                const {value, children, onRemove} = valueProps;

                const onDelete = event => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemove(value);
                };

                if (onRemove) {
                    return (
                        <Chip
                            tabIndex={-1}
                            label={children}
                            className={classes.chip}
                            deleteIcon={<CancelIcon onTouchEnd={onDelete}/>}
                            onDelete={onDelete}
                        />
                    );
                }

                return <div className="Select-value">{children}</div>;
            }}
            {...other}
        />
    );
}

class UserMultipleSelect extends React.Component {

    handleChange = value => {
        this.props.onSelect(value);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    value={this.props.values}
                    onChange={this.handleChange}
                    placeholder="Select multiple countries"
                    name="react-select-chip"
                    inputProps={{
                        classes,
                        multi: true,
                        instanceId: 'react-select-chip',
                        id: 'react-select-chip',
                        simpleValue: true,
                        options: suggestions,
                    }}
                />
            </div>
        );
    }
}

UserMultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    values: PropTypes.string,
    onSelect: PropTypes.func.isRequired
};

export default withStyles(Styles, {withTheme: true})(UserMultipleSelect);