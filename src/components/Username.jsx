const Username = (props) => {

    const username = props.text.split(' ');
    const className = props.className

    return <div>
        <span className={className}>{`${username[0]} `}</span>{username.slice(1).join(' ')}
    </div>
}

export default Username