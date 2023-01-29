import Header from "@/Components/Header";
import ToTop from "@/components/ToTop";

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
