import * as React from "react";
import { Link } from "react-router-dom";
import { Typography } from "rmwc/Typography";

class FourOhFour extends React.Component<{}> {

  render() {
    return (
      <Link to="/">
        <Typography use="display4" tag="div">
          FourOhFour
        </Typography>
      </Link>
    );
  }
}

export default FourOhFour;
