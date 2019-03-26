import * as dotenv from 'dotenv';
import fs from 'fs';
import http from 'http';
import path from 'path';

dotenv.config();

class DataBuilder {
    static readonly path : string = `${path.join(__dirname, `${process.env.DATAFILE_NAME}`)}`;
    static readonly downloadUrl :string = `${process.env.DATAFILE_URI}`;

    public static build() {
        this.downloadDataFile();
    }

    private static downloadDataFile() : void {
        const file = fs.createWriteStream(this.path);
        http.get(this.downloadUrl, res => res.pipe(file));
    }
}

export default DataBuilder;