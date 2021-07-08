import ThemeColorButton from '../ThemeColorButton';

const Layout: React.FC = ({ children }) => {
  return children ? (
    <>
      <ThemeColorButton />
      {children}
    </>
  ) : null;
};

export default Layout;
