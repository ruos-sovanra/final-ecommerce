
import {Metadata, ResolvingMetadata} from "next";
import ProductDetail from "@/components/product/ProductDetail";


export type PropsParams = {
    params: {
        uuid: string;
    };
    searchParams: any;
};


export async function generateMetadata(
    { params, searchParams }: PropsParams,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const name = params.uuid;
    console.log(name)

    // fetch data
    const product = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${name}`).then((res) => res.json());

    console.log(product)

    return {
        title: product.payload.name,
        description: product.payload.description,
        openGraph: {
            images: product.payload.image,
        },
    };
}

const ProductDetailPage = (props:PropsParams) => {

    console.log(props.params.uuid)
    const uuid = props.params.uuid;



    return (
        <div className="bg-white">
            <ProductDetail uuid={uuid}/>
        </div>
    );
}

export default ProductDetailPage;

