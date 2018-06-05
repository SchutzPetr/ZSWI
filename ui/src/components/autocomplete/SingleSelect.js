import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import ArrowDropDownIcon from '@material-ui/icons/es/ArrowDropDown';
import CancelIcon from '@material-ui/icons/es/Cancel';
import ArrowDropUpIcon from '@material-ui/icons/es/ArrowDropUp';
import ClearIcon from '@material-ui/icons/es/Clear';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import Styles from "./style/SingleSelectStyle";
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

class SingleSelect extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Input
                    fullWidth={true}
                    inputComponent={SelectWrapped}
                    value={this.props.value ? this.props.value.value : null}
                    onChange={this.props.onSelect}
                    placeholder={this.props.placeholder}
                    id={"react-select-single"}
                    disabled={this.props.disabled}
                    inputProps={{
                        classes,
                        name: "react-select-single",
                        instanceId: "react-select-single",
                        simpleValue: this.props.simpleValue,
                        options: this.props.suggestions,
                    }}
                />
            </div>
        );
    }
}

SingleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.instanceOf(Suggestion),
    suggestions: PropTypes.arrayOf(Suggestion).isRequired,
    onSelect: PropTypes.func.isRequired,
    simpleValue: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
};

SingleSelect.defaultProps = {
    simpleValue: false,
    placeholder: "",
    disabled: false,
};

export default withStyles(Styles, {withTheme: true})(SingleSelect);