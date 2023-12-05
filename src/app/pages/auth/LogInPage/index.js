import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import LogInPage, { mapStateToProps, mapDispatchToProps } from "./LogInPage";
import "../../home/assets/scss/theme/style.scss";
import "../../home/assets/scss/theme/mbr-additional.css";
import "../../home/assets/scss/dropdown/style.css";
import "../../home/assets/scss/theme/common.scss";
import "../../home/assets/scss/theme/login.scss";
import "../../home/assets/scss/theme/signup.scss";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LogInPage));
