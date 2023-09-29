import EmptyState from "../components/EmptyState";

const Users = () => {
    return (
        <div className="h-screen">
            <div className="hidden lg:block lg:pl-80 h-full">
                <EmptyState />
            </div>
        </div>

    )
}

export default Users;
