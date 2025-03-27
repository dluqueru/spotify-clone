import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json';
import { TrackModel } from '@core/models/track.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return de same array', () => {
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default

    const result: TrackModel[] = pipe.transform(data)

    expect(result).toEqual(data)
  });

  it('should return an ASC ordered array', () => {
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default
    const firstValue = data.find((i: any) => i._id == 7)
    const lastValue = data.find((i: any) => i._id == 6)

    const result: TrackModel[] = pipe.transform(data, 'name', 'asc')
    const firstResult = result[0]
    const lastResult = result[result.length - 1]

    expect(firstValue).toEqual(firstResult)
    expect(lastValue).toEqual(lastResult)
  });
});
