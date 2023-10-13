interface RequestData {
    name: string;
    height: number;
    width: number;
    }

interface RequestResponse{
    requestData: RequestData,
    imageFileName: string 
}

type ImageScraper = (requestDate: RequestData) => Promise<RequestResponse>;