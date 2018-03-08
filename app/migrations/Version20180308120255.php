<?php declare(strict_types = 1);

namespace PHPDish\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180308120255 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE categories_managers DROP INDEX UNIQ_7FB7493FA76ED395, ADD INDEX IDX_7FB7493FA76ED395 (user_id)');
        $this->addSql('ALTER TABLE posts ADD root_id INT DEFAULT NULL, ADD lft INT NOT NULL, ADD rgt INT NOT NULL, ADD lvl INT NOT NULL');
        $this->addSql('ALTER TABLE posts ADD CONSTRAINT FK_885DBAFA79066886 FOREIGN KEY (root_id) REFERENCES posts (id) ON DELETE CASCADE');
        $this->addSql('CREATE INDEX IDX_885DBAFA79066886 ON posts (root_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE categories_managers DROP INDEX IDX_7FB7493FA76ED395, ADD UNIQUE INDEX UNIQ_7FB7493FA76ED395 (user_id)');
        $this->addSql('ALTER TABLE posts DROP FOREIGN KEY FK_885DBAFA79066886');
        $this->addSql('DROP INDEX IDX_885DBAFA79066886 ON posts');
        $this->addSql('ALTER TABLE posts DROP root_id, DROP lft, DROP rgt, DROP lvl');
    }
}
