import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { FileService } from 'src/file.service';
import { Stock } from './entities/stock.entity';
export declare class StocksService {
    private fileService;
    constructor(fileService: FileService<Stock[]>);
    findAll(title?: string): Stock[];
    create(createStockDto: CreateStockDto): void;
    findOne(id: number): Stock | null;
    update(id: number, updateStockDto: UpdateStockDto): void;
    remove(id: number): void;
}
