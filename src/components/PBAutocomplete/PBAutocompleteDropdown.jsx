import React from 'react';
import PropTypes from 'prop-types';

const PBAutocompleteDropdown = ({
    options,
    onSelect,
    isOpen,
    isFetching,
}) => isOpen && (options.length || isFetching) ? (
    <div className="pb-autocomplete-dropdown">
        {
            isFetching ?
                <div>Fetching...</div> :
                options.map(o => (
                    <button key={o.value} onClick={() => onSelect(o)}>
                        {o.label}
                    </button>
                ))
        }
    </div>
) : null;

PBAutocompleteDropdown.propTypes = {
    options    : PropTypes.array.isRequired,
    onSelect   : PropTypes.func.isRequired,
    isOpen     : PropTypes.bool.isRequired,
    isFetching : PropTypes.bool.isRequired,
}

export default PBAutocompleteDropdown;
