"use client";
import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import ClientLayout from "./ClientLayout";

interface PageLayoutProps {
    children: ReactNode;
    showBackButton?: boolean;
}

const MathSymbol = ({ symbol, x, y, size, duration, delay }: { 
    symbol: string; 
    x: number; 
    y: number; 
    size: number;
    duration: number;
    delay: number;
}) => {
    const floatAnimation = {
        y: [y, y - 50, y],
        opacity: [0.5, 0.7, 0.5],
    };

    return (
        <motion.div
            className="absolute text-white opacity-70 font-bold"
            style={{ 
                left: `${x}%`, 
                top: `${y}%`,
                fontSize: `${size}rem`,
            }}
            animate={floatAnimation}
            transition={{
                duration,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            {symbol}
        </motion.div>
    );
};

export default function PageLayout({ children, showBackButton = true }: PageLayoutProps) {
    // Generate math symbols with random positions
    const mathSymbols = useMemo(() => {
        const symbols = ["+", "-", "×", "÷", "=", "<", ">", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "π"];
        return Array.from({ length: 25 }, (_, i) => ({
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2,
            duration: 5 + Math.random() * 10,
            delay: Math.random() * 5,
            id: i
        }));
    }, []);

    return (
        <main className="flex min-h-screen flex-col justify-center items-center p-12 relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#8EC5FC] to-[#E0C3FC] z-0" />
            
            {/* Animated math symbols */}
            {mathSymbols.map((symbol) => (
                <MathSymbol
                    key={symbol.id}
                    symbol={symbol.symbol}
                    x={symbol.x}
                    y={symbol.y}
                    size={symbol.size}
                    duration={symbol.duration}
                    delay={symbol.delay}
                />
            ))}
            
            {/* Content */}
            <div className="z-10 relative w-full flex justify-center flex-col items-center">
                <ClientLayout showBackButton={showBackButton}>
                    {children}
                </ClientLayout>
            </div>
        </main>
    );
}