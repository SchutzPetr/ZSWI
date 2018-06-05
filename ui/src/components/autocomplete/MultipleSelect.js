import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import ArrowDropDownIcon from '@material-ui/icons/es/ArrowDropDown';
import CancelIcon from '@material-ui/icons/es/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/es/ArrowDropUp';
import ClearIcon from '@material-ui/icons/es/Clear';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Styles from "./style/UserMultipleSelectStyle";
import Suggestion from "./entity/Suggestion";
import {Chip, Input, MenuItem, Typography} from "@material-ui/core/index";

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
    const {classes, disabled, ...other} = props;

    return (
        <Select
            optionComponent={Option}
            disabled={disabled}
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
                    if(disabled){
                        return;
                    }
                    onRemove(value);
                };

                if (onRemove) {
                    return (
                        <Chip
                            tabIndex={-1}
                            label={children}
                            className={classes.chip}
                            disabled={disabled}
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

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Input
                    fullWidth
                    inputComponent={SelectWrapped}
                    value={this.props.values}
                    onChange={this.props.onSelect}
                    placeholder={this.props.placeholder}
                    name={"react-select-chip"}
                    disabled={this.props.disabled}
                    inputProps={{
                        classes,
                        multi: true,
                        instanceId: 'react-select-chip',
                        id: 'react-select-chip',
                        simpleValue: this.props.simpleValue,
                        options: this.props.suggestions,
                        disabled: this.props.disabled
                    }}
                />
            </div>
        );
    }
}

UserMultipleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    values: PropTypes.arrayOf(Suggestion),
    suggestions: PropTypes.arrayOf(Suggestion).isRequired,
    onSelect: PropTypes.func.isRequired,
    simpleValue: PropTypes.bool,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

UserMultipleSelect.defaultProps = {
    simpleValue: false,
    placeholder: "",
    disabled: false
};

export default withStyles(Styles, {withTheme: true})(UserMultipleSelect);