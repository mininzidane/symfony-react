import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import TitlesService from 'backend/js/api/TitlesService';
import TitleReceivedSearchOption from '../SearchOption';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class TitleReceivedNewVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      options: [],
    };

    this.typeahead = React.createRef();

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addNewVehicle = this.addNewVehicle.bind(this);
    this.titlesService = new TitlesService();
  }

  componentDidUpdate() {
    const { isOnFocus } = this.props;

    if (isOnFocus) {
      this.typeahead.getInstance().focus();
    }
  }

  handleSearch(query) {
    const regex = /^([0-9]*)([A-Z]{1})$/gm;
    const regexQR = new RegExp('^[^/]*/[^/]*/([0-9]*)/$', 'i');
    let matched = query.trim();

    if (regex.test(matched)) {
      matched = query.substr(0, query.length - 1);
      this.typeahead.getInstance().value = matched;
    } else if (regexQR.test(matched)) {
      [, matched] = regexQR.exec(matched);
      this.typeahead.getInstance().value = matched;
    }

    this.setState({ isLoading: true });
    this.titlesService
      .searchLotPurchase(matched)
      .then((options) => {
        if (options.length === 1) {
          if (options[0].sycCount) {
            this.setState({
              isLoading: false,
              options,
            });

            return;
          }

          this.addNewVehicle(options[0]);
        }

        this.setState({
          isLoading: false,
          options,
        });
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  }

  handleChange(event) {
    if (event[0]) {
      if (event[0].sycCount) {
        this.typeahead.getInstance().clear();
      } else {
        this.addNewVehicle(event[0]);
      }
    }
  }

  addNewVehicle(vehicle) {
    const { onAddVehicle } = this.props;

    onAddVehicle(vehicle);
    this.typeahead.getInstance().clear();
  }

  render() {
    return (
      <div>
        <AsyncTypeahead
          id="vehicle-typeahead"
          {...this.state} // eslint-disable-line react/jsx-props-no-spreading
          ref={(typeahead) => {
            this.typeahead = typeahead;
          }}
          labelKey={(option) => `${option.lot} ${option.vin}`}
          minLength={4}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          filterBy={() => true}
          placeholder="Search for vehicle..."
          selectHintOnEnter
          renderMenuItemChildren={(option) => (
            <TitleReceivedSearchOption
              key={option.id}
              {...(option.sycCount ? { sycCount: option.sycCount } : { vehicle: option })}
            />
          )}
        />

        <div className="small">Please enter at least 4 characters</div>
      </div>
    );
  }
}

TitleReceivedNewVehicle.propTypes = {
  onAddVehicle: PropTypes.func.isRequired,
  isOnFocus: PropTypes.bool.isRequired,
};

export default TitleReceivedNewVehicle;
