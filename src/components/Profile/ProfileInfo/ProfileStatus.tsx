import React, {ChangeEvent} from 'react';

type PropsType = {
    status: string,
    updateStatus: (newStatus: string) => void
}
type StateType = {
    editMode: boolean,
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({ // костыль вместо setState - this.forceUpdate()
            editMode: true
        })
        this.state.editMode = true
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.state.editMode = false
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value.length <= 200){
        this.setState({
            status: e.currentTarget.value
        })}
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status)
            this.setState({
                status: this.props.status
            })
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>{this.props.status || "No status"}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange}
                           autoFocus={true}
                           onBlur={this.deactivateEditMode}
                           value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;