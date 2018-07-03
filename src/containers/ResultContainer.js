import React, {Component} from 'react';
import TextArea from '../components/TextArea';

class ResultContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: 'My new description'
        };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    componentDidMount() {
    }
    handleDescriptionChange(e) {
        // const textArray = e.target.value.split('').filter(x => x !== 'e');
        // console.log('string split into array of letters',textArray);
        // const filteredText = textArray.join('');
        // this.setState({ description: filteredText }, () => console.log('description', this.state.description));
        this.setState({ description: e.target.value }, () => console.log('description', this.state.description));
    }

    render() {
        return (
            <form className="container">
            <TextArea
                    title={'Metadata:'}
                    rows={25}
                    resize={true}
                    content={this.props.result}
                    placeholder={'metadata here'} />
            </form>
        );
    }
}

export default ResultContainer;