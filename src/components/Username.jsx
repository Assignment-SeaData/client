const Username = (props) => {

    const username = props.text.split(' ');
    const className = props.className

    return <div>
        <span className={className}>{`${username[0]} `}</span>{username[1]}
    </div>
}

export default Username