export default function IconWithText({icon, text, styles,open,selected}: {icon: React.ReactNode, text: string, styles: any,open: boolean,selected: boolean}){
    return(
        <>
            <div className={`flex justify-start ${selected?styles.selectedIcon:""}` } style={{margin:open?"0 10px 0 0":"0 auto",paddingLeft:open?"20px":"0"}}>
                {icon}
                {open?
                <p className={`${styles.text}`}>{text}</p>:<></>}
            </div>
        </>
    );
}