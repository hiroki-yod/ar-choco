import Header from "@/Components/Header";
import ToTop from "@/Components/ToTop";

const Layout = ({ children }) => {
    return (
        <div>
            <Header></Header>
            {children}
            <ToTop></ToTop>
        </div>
    );
};

export default Layout;
