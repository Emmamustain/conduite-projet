import { ReactNode } from "react";
import ClientLayout from "./ClientLayout";

interface PageLayoutProps {
    children: ReactNode;
    showBackButton?: boolean;
}

export default function PageLayout({ children, showBackButton = true }: PageLayoutProps) {
    return (
        <main className="flex min-h-screen flex-col items-center p-12 bg-gradient-to-b from-[#FFE5F0] to-[#E5F0FF] relative">
            <ClientLayout showBackButton={showBackButton}>
                {children}
            </ClientLayout>
        </main>
    );
} 