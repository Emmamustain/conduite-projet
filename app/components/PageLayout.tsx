import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";

interface PageLayoutProps {
    children: ReactNode;
    showBackButton?: boolean;
}

export default function PageLayout({ children, showBackButton = true }: PageLayoutProps) {
    return (
        <main className="flex min-h-screen flex-col items-center p-12 relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/images/background.jpg")' }}>
            <ClientLayout showBackButton={showBackButton}>
                {children}
            </ClientLayout>
        </main>
    );
} 