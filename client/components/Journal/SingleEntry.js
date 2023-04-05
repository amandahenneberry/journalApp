import React, {Component}  from 'react'
import {connect} from 'react-redux'
import { fetchEntry } from '../../store/auth';

class SingleEntry extends Component{

    componentDidMount(){
       this.props.loadEntry(this.props.entryId);

    }

    render(){
        const entry = this.props.entry || [];
        const content = entry.content || 'content fail';
        const date = entry.date || '';

        console.log('curr state: '+entry.id)
        return(
            <div>
                {entry.title}
                <p>{date}</p>
                <div>{content}</div>
            </div>
        )
    }

}

const mapStateToProps = (state) =>{
    return{
        entry: state.auth.entry
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        loadEntry: (entryId) => dispatch(fetchEntry(entryId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleEntry);
