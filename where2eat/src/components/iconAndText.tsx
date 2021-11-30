export default function IconAndText(props: {icon: string, text: string|null}) {
    return(
        <div className="IconAndText">
            <img src={props.icon} className="Icon" alt=""/>
            <p> {props.text} </p>
        </div>
    )
}