import React, { PureComponent } from "react";
import $ from "jquery";
class Message extends PureComponent {
  render() {
    return (
      <div
        className="modal fade"
        id={this.props.id}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                The End
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">Points: {this.props.points}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.props.resetGame();
                  $("#" + this.props.id).modal("hide");
                }}
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Message;
