import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router";
import {
  $setNewItem,
  $saveItem,
  $updateItemValue,
  $changeItem
} from "../../../modules/subscription/category";
import { makeStyles } from "@material-ui/core";
import { Button, Paper, TextField, Grid} from "@material-ui/core";

class Main extends Component {
  //function Main({item,isloading})
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.classes = this.useStyles();
  }
  handleOnSubmit = e => {
    e.preventDefault();
    this.props.$saveItem(this.props.history);
    return false;
  };
  handleChange(name) {
    return event => {
      this.props.$updateItemValue(name, event.target.value);
    };
  }
  useStyles() {
    return makeStyles(theme => ({
      root: {
        display: "block",
        flexWrap: "wrap"
      },
      textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
      },
      margin: {
        margin: theme.spacing(1)
      }
    }));
  }
  render() {
    return (
      <Paper className={this.classes.root} style={{ padding: "25px" }}>
        {this.props.item ? (
          <form
            id="category-form"
            onSubmit={this.handleOnSubmit}
            className={this.classes.root}
            autoComplete="off"
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  id="name"
                  label="Name"
                  error={this.props.errors.name.length === 0 ? false : true}
                  helperText={this.props.errors.name}
                  className={this.classes.textField}
                  value={this.props.item.name}
                  onChange={this.handleChange("name")}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </form>
        ) : this.props.isloading ? (
          <h3 className="kt-subheader__title" style={{ padding: "25px" }}>
            Loading...
          </h3>
        ) : (
          <h3 className="kt-subheader__title" style={{ padding: "25px" }}>
            The Item doesn't exist
          </h3>
        )}
      </Paper>
    );
  }
}
const mapStateToProps = state => ({
  item: state.category.item,
  errors: state.category.errors,
  isloading: state.category.isloading
});
const mapDispatchToProps = {
  $updateItemValue,
  $saveItem
};
const CategoryCreate = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(Main))
);

class Sub extends Component {
  componentDidMount() {
    this.id = this.props.match.params.id;
    if (this.id) this.props.$changeItem(this.id);
    else this.props.$setNewItem();
  }
  render() {
    return (
      <>
        <div className="kt-subheader__main">
          {false && (
            <button
              className="kt-subheader__mobile-toggle kt-subheader__mobile-toggle--left"
              id="kt_subheader_mobile_toggle"
            >
              <span />
            </button>
          )}
          {this.id ? (
            this.props.item ? (
              <h3 className="kt-subheader__title">
                Category {this.props.item.name}
              </h3>
            ) : this.props.isloading ? (
              <h3 className="kt-subheader__title">Loading...</h3>
            ) : (
              <h3 className="kt-subheader__title">There is no item</h3>
            )
          ) : (
            <h3 className="kt-subheader__title">New Category</h3>
          )}
          <span className="kt-subheader__separator kt-subheader__separator--v" />
          <span className="kt-subheader__desc"></span>
        </div>

        <div className="kt-subheader__toolbar">
          <div className="kt-subheader__wrapper">
            <Button
              className="btn kt-subheader__btn-primary btn-primary"
              form="category-form"
              type="submit"
              disabled={this.props.isSaving}
            >
              Submit &nbsp;
            </Button>
            <Button
              type="button"
              className="btn kt-subheader__btn-primary btn-primary"
              onClick={this.props.history.goBack}
            >
              Back &nbsp;
            </Button>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToPropsSub = state => ({
  item: state.category.item,
  isSaving: state.category.isSaving
});
const mapDispatchToPropsSub = {
  $changeItem,
  $setNewItem
};
const SubHeaderCategoryCreate = injectIntl(
  connect(mapStateToPropsSub, mapDispatchToPropsSub)(withRouter(Sub))
);
export { CategoryCreate, SubHeaderCategoryCreate };
