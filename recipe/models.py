from django.db import models
from picklefield.fields import PickledObjectField


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=128, unique=True, verbose_name='Category name')

    def __str__(self):
        # Return a string that represents the instance
        return f"{self.name}"

    def recipes_count(self):
        return self.recipes.count()

    class Meta:
        verbose_name_plural = 'Categories'


class Recipe(models.Model):
    title = models.CharField(max_length=128, verbose_name='Title')
    text = models.TextField()
    ingredients = PickledObjectField(editable=True)
    image = models.ImageField(upload_to='uploads/')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='recipes',
                                 verbose_name='Category')

    def ingredients_unpacked(self):
        return u'{ingredients}'.format(ingredients=self.ingredients)
