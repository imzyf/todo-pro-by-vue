import className from '../assets/styles/footer.styl'

export default {
    data() {
        return {
            author: 'Yifans_Z',
            origin: 'Jokcy/vue-todo-tech'
        }
    },
    render() {
        return (
            <div id={className.footer}>
                <span>Written by {this.author} , Refer to {this.origin}</span>
            </div>
        )
    }
}
