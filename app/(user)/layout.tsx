
import { Inter } from "next/font/google";
import "../globals.css";
import NavbarComponent from "@/components/navbar/NavbarComponent";
import FooterComponent from "@/components/footer/FooterComponent";
import StoreProvider from "@/app/StoreProvider";
import {StaticImageData} from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Thumbnail from '@/public/logo.svg';

const inter = Inter({ subsets: ["latin"] });

export type Metadata = {
  metadataBase: string;
  manifest: string;
  title: {
    template: string;
    default: string;
  };
  thumbnail: string[] | StaticImageData[] | StaticImport[];
  description: string;
  keywords: string[];
  locale: string;
  category: string;
  type: string;
  siteName: string;
  openGraph: {
    title: {
      template: string;
      default: string;
    };
    description: string;
    url: string | StaticImageData | StaticImport;
    siteName: string;
    images: {
      url: string | StaticImageData | StaticImport;
      width: number;
      height: number;
    }[];
  };
  twitter: {
    card: string;
    title: {
      template: string;
      default: string;
    };
    description: string;
    creator: string;
    images: string[] | StaticImageData[] | StaticImport[];
  };
};



const desc = "Psa-Khmer is a comprehensive e-commerce platform offering a wide range of products. Utilizing advanced search and filtering options, it provides a seamless shopping experience for users.";

export const metadata: Metadata = {
  metadataBase: "https://online-store.psa-khmer.world",
  manifest: "/manifest.json",
  title: {
    template: '%s - Psa-Khmer',
    default: 'Psa-Khmer E-commerce Platform',
  },
  thumbnail: [
    Thumbnail.src,
  ],
  description: desc,
  keywords: ["E-commerce", "Psa-Khmer", "Online Shopping", "Products", "Advanced Search"],
  locale: 'en-US',
  category: 'Shopping, Technology, E-commerce',
  type: 'website',
  siteName: 'Psa-Khmer',
  openGraph: {
    title: {
      template: '%s - Psa-Khmer',
      default: 'Psa-Khmer E-commerce Platform',
    },
    description: desc,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    siteName: 'Psa-Khmer',
    images: [
      {
        url: Thumbnail.src,
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s - Psa-Khmer',
      default: 'Psa-Khmer E-commerce Platform',
    },
    description: desc,
    creator: '@PsaKhmer',
    images: [
      Thumbnail.src,
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <StoreProvider>
      <header>
        <NavbarComponent/>
      </header>
      {children}
    </StoreProvider>
      <FooterComponent/>
    </body>
    </html>
  );
}
