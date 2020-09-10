import lodash from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

const StreamEdit = (props) => {
  //   console.log(props);

  const { stream, fetchStream, editStream, match } = props;

  useEffect(() => {
    fetchStream(match.params.id);
    // eslint-disable-next-line
  }, []);

  const onSubmit = (formValues) => {
    // console.log(formValues);

    editStream(match.params.id, formValues);
  };

  if (!stream) return <div>Loading...</div>;

  return (
    <div>
      <h3>Edit a Stream</h3>
      <StreamForm
        initialValues={lodash.pick(stream, "title", "description")}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
