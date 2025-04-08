import Link from "next/link"
import CustomMenuItem from "./CustomMenu/CustomMenuItem"

function CompetitionMenuItemLink(
    {label, disabled, link}: 
    {label: string; disabled: boolean; link:string})
    {
    return <CustomMenuItem
            label={label}
            showBorder={true}
            disabled={disabled}
        >
            <Link
            href={link}
            >
            {label}
            </Link>
        </CustomMenuItem>
}


export default CompetitionMenuItemLink