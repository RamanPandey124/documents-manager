import Child from "./Child";
import Parent from "./Parent";

export default function page() {
    return (
        <div>
            page
            <Parent><Child /></Parent>
        </div>
    )
}