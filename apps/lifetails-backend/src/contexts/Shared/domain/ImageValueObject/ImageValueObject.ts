import { ValueObject } from '../ValueObject';
import { StringValueObject } from '../StringValueObject';
import { DateValueObject } from '../DateValueObject';
import { EmptyImageKeyException } from './EmptyImageKeyException';
import { InvalidImageUploadDateException } from './InvalidImageUploadDateException';

export interface Image {
  key: string;
  uploadedAt: Date;
}

export class ImageValueObject extends ValueObject<Image> {
  constructor(key: string, uploadedAt: Date) {
    const image: Image = { key: key.trim(), uploadedAt };

    if (image.key === '') {
      throw new EmptyImageKeyException();
    }

    if (isNaN(uploadedAt.getTime())) {
      throw new InvalidImageUploadDateException(uploadedAt);
    }

    super(image);
  }

  public static fromPrimitives(key: string, uploadedAt: Date): ImageValueObject {
    return new ImageValueObject(key, uploadedAt);
  }

  public getKey(): StringValueObject {
    return new StringValueObject(this.value.key);
  }

  public getUploadedAt(): DateValueObject {
    return new DateValueObject(this.value.uploadedAt);
  }

  public toPrimitives(): Image {
    return {
      key: this.value.key,
      uploadedAt: this.value.uploadedAt,
    };
  }

  public equals(other: ImageValueObject): boolean {
    return (
      this.value.key === other.value.key &&
      this.value.uploadedAt.getTime() === other.value.uploadedAt.getTime()
    );
  }
}
